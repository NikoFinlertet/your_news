'use client';

import { useRef, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from '../styles/components/UserMenu.css';

interface UserMenuProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export function UserMenu({ user, isOpen, onClose }: UserMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.menu} ref={menuRef}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          {user.user_metadata.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt={user.email || 'User avatar'}
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {user.email?.[0].toUpperCase()}
            </div>
          )}
        </div>
        <div className={styles.userDetails}>
          <div className={styles.userName}>
            {user.user_metadata.full_name || user.email}
          </div>
          <div className={styles.userEmail}>{user.email}</div>
        </div>
      </div>

      <div className={styles.menuItems}>
        <button className={styles.menuItem} onClick={handleSignOut}>
          Выйти
        </button>
      </div>
    </div>
  );
} 