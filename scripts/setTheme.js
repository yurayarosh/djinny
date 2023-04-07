const ColorThemes = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
});

const setTheme = () => {
  const init = () => {
    const checkbox = document.getElementById('themeSwitch');
    const theme = localStorage.getItem('coor-theme') || ColorThemes.LIGHT;

    document.documentElement.setAttribute('data-theme', theme);
    checkbox.checked = theme === ColorThemes.DARK;
  };

  const onChange = ({ target }) => {
    if (target.id === 'themeSwitch') {
      const theme = target.checked ? ColorThemes.DARK : ColorThemes.LIGHT;
      localStorage.setItem('coor-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  };

  return {
    init,
    onChange,
  };
};

export default setTheme;
