'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppRoutes } from '@/routes/hooks';
import { useState } from 'react';

/**
 * 헤더 컴포넌트
 * routes/hooks.js에서 제공하는 훅을 사용하여 네비게이션 메뉴를 표시합니다.
 */
export default function Header() {
    const currentPath = usePathname();
    // 라우트 설정에서 네비게이션 링크 가져오기
    const navLinks = useAppRoutes();

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);

        const event = new CustomEvent('toggle-sidebar');
        window.dispatchEvent(event);
    };

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link href="/" className="header__logo-link">
                        <h1 className="header__title">CUI</h1>
                    </Link>
                </div>

                <nav className="header__nav">
                    <ul className="header__nav-list">
                        {navLinks.map((link) => (
                            <li key={link.href} className="header__nav-item">
                                <Link
                                    href={link.href}
                                    className={`header__nav-link ${currentPath === link.href ? 'header__nav-link--active' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button
                    className="header__hamburger"
                    onClick={toggleSidebar}
                    aria-label="메뉴 토글"
                >
                    <span className="header__hamburger-line"></span>
                    <span className="header__hamburger-line"></span>
                    <span className="header__hamburger-line"></span>
                </button>
            </div>
        </header>
    );
}
