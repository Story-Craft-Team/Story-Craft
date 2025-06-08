export const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>, setIsVisible: (value: boolean) => void) => {
    // Проверяем, что клик был именно на оверлей, а не на его детей
    if (e.target === e.currentTarget) {
        setIsVisible(false);
    }
};