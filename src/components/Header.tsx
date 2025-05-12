'use client';

import { useState } from 'react';
import { useAuth } from './providers/AuthProvider';
import { AuthModal } from './AuthModal';
import { UserMenu } from './UserMenu';
import { TagsMenu } from './TagsMenu';
import '../styles/components/Header.css';

interface HeaderProps {
  articles?: any[];
  onTagSelect?: (tags: string[]) => void;
  selectedTags?: string[];
}

export function Header({ articles = [], onTagSelect, selectedTags = [] }: HeaderProps) {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <h1 className="header-title">YourNews</h1>
          <p className="header-subtitle">
            Агрегатор новостей и аналитики
          </p>
        </div>
        <div className="header-actions">
          {articles.length > 0 && (
            <TagsMenu
              articles={articles}
              selectedTags={selectedTags}
              onTagSelect={onTagSelect}
            />
          )}
          {user ? (
            <UserMenu
              user={user}
              isOpen={isUserMenuOpen}
              onClose={() => setIsUserMenuOpen(false)}
            />
          ) : (
            <button
              className="auth-button"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Войти
            </button>
          )}

        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
} 

/*

*/