"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ym, { YMInitializer } from "react-yandex-metrika";

const ym_counter_id = process.env.YM_COUNTER_ID ?? '0';

const YandexMetrika = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      ym("hit", pathname);
    }
  }, [pathname]);

  return (
    <YMInitializer
      accounts={[ym_counter_id as unknown as number]}
      options={{
        defer: true,
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      }}
      version="2"
    />
  );
};

export default YandexMetrika;