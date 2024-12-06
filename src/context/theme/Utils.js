export const convertHexToRGBA = (hexCode, opacity) => {
  let hex = hexCode.replace("#", "");
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  if (typeof opacity === "number") {
    return `rgba(${r},${g},${b},${opacity / 100})`;
  }
  return `rgba(${r},${g},${b})`;
};
export const DefaultTheme = {
  colors: {
    primary: "#6200EE",
    primaryVariant: "#3700B3",
    secondary: "#03DAC6",
    secondaryVariant: "#018786",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    error: "#B00020",
    onPrimary: "#FFFFFF",
    onSecondary: "#000000",
    onBackground: "#000000",
    onSurface: "#000000",
    onError: "#FFFFFF",
  },
  isDark: false,
};

export const generateTheme = (theme) => {
  return {
    ...theme,
    backgroundScreen: () => {
      const { onBackground } = theme.colors;
      return {
        subheading:
          theme.custom?.backgroundScreen?.subheading ||
          convertHexToRGBA(onBackground, 10),
        title: theme.custom?.backgroundScreen?.title || onBackground,
        paragraph:
          theme.custom?.backgroundScreen?.paragraph ||
          convertHexToRGBA(onBackground, 60),
        caption:
          theme.custom?.backgroundScreen?.caption ||
          convertHexToRGBA(onBackground, 20),
      };
    },
    text: () => {
      const { primary, secondary, secondaryVariant } = theme.colors;
      return {
        primary: theme.custom?.text?.primary || primary,
        secondary: theme.custom?.text?.secondary || secondary,
        secondaryVariant:
          theme.custom?.text?.secondaryVariant || secondaryVariant,
      };
    },
    emptyState: () => {
      const { onBackground } = theme.colors;
      return {
        title: theme.custom?.emptyState?.title || onBackground,
        supportingText:
          theme.custom?.emptyState?.supportingText ||
          convertHexToRGBA(onBackground, 30),
      };
    },
    appBarBottom: () => {
      const { surface, onSurface } = theme.colors;
      return {
        container: theme.custom?.appBarBottom?.container || surface,
        icon: theme.custom?.appBarBottom?.icon || onSurface,
      };
    },
    appBarTop: () => {
      const { primary, onPrimary, secondary } = theme.colors;
      return {
        header: theme.custom?.appBarTop?.header || primary,
        notification: theme.custom?.appBarTop?.notification || secondary,
        divider:
          theme.custom?.appBarTop?.divider || convertHexToRGBA(onPrimary, 12),
        icon: theme.custom?.appBarTop?.icon || onPrimary,
        iconSwitched: theme.custom?.appBarTop?.iconSwitched || secondary,
        text: theme.custom?.appBarTop?.text || onPrimary,
      };
    },
    banners: () => {
      const { primary, surface, onSurface } = theme.colors;
      return {
        container: theme.custom?.banners?.container || surface,
        text: theme.custom?.banners?.text || onSurface,
        button: theme.custom?.banners?.button || primary,
        divider:
          theme.custom?.banners?.divider || convertHexToRGBA(onSurface, 12),
      };
    },
    bottomNavigation: () => {
      const { primary, onPrimary } = theme.colors;
      return {
        container: theme.custom?.bottomNavigation?.container || primary,
        activeIconText:
          theme.custom?.bottomNavigation?.activeIconText || onPrimary,
        inactiveIconsText:
          theme.custom?.bottomNavigation?.inactiveIconsText ||
          convertHexToRGBA(onPrimary, 76),
      };
    },
    buttons: (mode) => {
      const { primary, surface, onPrimary, background, onBackground } =
        theme.colors;
      if (mode === "contained") {
        return {
          container: theme.custom?.buttons?.container || primary,
          icon: theme.custom?.buttons?.icon || onPrimary,
          text: theme.custom?.buttons?.text || onPrimary,
          divider: theme.custom?.buttons?.divider || "transparent",
          disabled:
            theme.custom?.buttons?.disabled ||
            convertHexToRGBA(onBackground, 60),
        };
      } else if (mode === "outlined") {
        const container = theme.isDark ? surface : background;
        return {
          container: theme.custom?.buttons?.container || container,
          icon: theme.custom?.buttons?.icon || primary,
          text: theme.custom?.buttons?.text || primary,
          divider: theme.custom?.buttons?.divider || primary,
          disabled:
            theme.custom?.buttons?.disabled ||
            convertHexToRGBA(onBackground, 60),
        };
      }
      return {
        container: theme.custom?.buttons?.container || background,
        icon: theme.custom?.buttons?.icon || primary,
        text: theme.custom?.buttons?.text || primary,
        divider: theme.custom?.buttons?.divider || "transparent",
        disabled:
          theme.custom?.buttons?.disabled || convertHexToRGBA(onBackground, 60),
      };
    },
    floatingButtons: () => {
      const { primary, secondary } = theme.colors;
      return {
        container: theme.custom?.floatingButtons?.container || secondary,
        icon: theme.custom?.floatingButtons?.icon || primary,
        text: theme.custom?.floatingButtons?.text || primary,
        divider: theme.custom?.floatingButtons?.divider || secondary,
      };
    },
    cards: () => {
      const { primary, onSurface, surface } = theme.colors;
      return {
        container: theme.custom?.cards?.container || surface,
        headerText: theme.custom?.cards?.headerText || onSurface,
        subHeader:
          theme.custom?.cards?.subHeader || convertHexToRGBA(onSurface, 76),
        supportingText:
          theme.custom?.cards?.supportingText ||
          convertHexToRGBA(onSurface, 50),
        divider:
          theme.custom?.cards?.divider || convertHexToRGBA(onSurface, 12),
        icon: theme.custom?.cards?.icon || convertHexToRGBA(onSurface, 76),
        button: theme.custom?.cards?.button || primary,
      };
    },
    chips: () => {
      const { primary, onPrimary, onSurface } = theme.colors;
      return {
        selectedContainer: theme.custom?.chips?.selectedContainer || primary,
        selectedText: theme.custom?.chips?.selectedText || onPrimary,
        unselectedText: theme.custom?.chips?.unselectedText || onSurface,
        unselectedContainer:
          theme.custom?.chips?.unselectedContainer || onSurface,
        divider: theme.custom?.chips?.divider || onSurface,
      };
    },
    dialogs: () => {
      const { surface, onSurface, primary } = theme.colors;
      return {
        container: theme.custom?.dialogs?.container || surface,
        title: theme.custom?.dialogs?.title || convertHexToRGBA(onSurface, 87),
        supportingText:
          theme.custom?.dialogs?.supportingText ||
          convertHexToRGBA(onSurface, 60),
        button: theme.custom?.dialogs?.button || primary,
        overlay:
          theme.custom?.dialogs?.overlay || convertHexToRGBA(onSurface, 32),
      };
    },
    dividers: () => {
      const { onSurface } = theme.colors;
      return {
        divider:
          theme.custom?.dividers?.divider || convertHexToRGBA(onSurface, 12),
      };
    },
    lists: () => {
      const { surface, onSurface } = theme.colors;
      return {
        container: theme.custom?.lists?.container || surface,
        text: theme.custom?.lists?.text || onSurface,
        icon: theme.custom?.lists?.icon || convertHexToRGBA(onSurface, 76),
        metadataText:
          theme.custom?.lists?.metadataText || convertHexToRGBA(onSurface, 76),
        divider:
          theme.custom?.lists?.divider || convertHexToRGBA(onSurface, 20),
      };
    },
    menus: () => {
      const { surface, primary, onSurface } = theme.colors;
      return {
        container: theme.custom?.menus?.container || surface,
        text: theme.custom?.menus?.text || onSurface,
        icon: theme.custom?.menus?.icon || primary,
        overlay: theme.custom?.menus?.overlay || primary,
      };
    },
    drawer: () => {
      const { surface, primary, onSurface } = theme.colors;
      return {
        container: theme.custom?.drawer?.container || surface,
        activatedIcon: theme.custom?.drawer?.activatedIcon || primary,
        activatedText: theme.custom?.drawer?.activatedText || primary,
        activatedOverlay:
          theme.custom?.drawer?.activatedOverlay ||
          convertHexToRGBA(primary, 12),
        inactiveItem: theme.custom?.drawer?.inactiveItem || onSurface,
        overlay: theme.custom?.drawer?.overlay || onSurface,
      };
    },
    progressIndicators: () => {
      const { primary } = theme.colors;
      return {
        color: theme.custom?.progressIndicators?.color || primary,
      };
    },
    selectionControls: () => {
      const { primary, onSurface } = theme.colors;
      return {
        color: theme.custom?.selectionControls?.color || primary,
        overlay:
          theme.custom?.selectionControls?.overlay ||
          convertHexToRGBA(onSurface, 76),
        text: theme.custom?.selectionControls?.text || onSurface,
      };
    },
    snackbars: () => {
      const { background, primary } = theme.colors;
      return {
        container: theme.custom?.snackbars?.container || background,
        buttonText: theme.custom?.snackbars?.buttonText || primary,
      };
    },
    tabs: () => {
      const { onPrimary, primary, onSurface } = theme.colors;
      return {
        container: theme.custom?.tabs?.container || primary,
        activeText: theme.custom?.tabs?.activeText || onPrimary,
        indicator: theme.custom?.tabs?.indicator || onPrimary,
        inactiveText:
          theme.custom?.tabs?.inactiveText || convertHexToRGBA(onSurface, 82),
        divider: theme.custom?.tabs?.divider || convertHexToRGBA(onSurface, 12),
      };
    },
    textFields: () => {
      const { primary, onSurface, background } = theme.colors;
      return {
        icon: theme.custom?.textFields?.icon || convertHexToRGBA(onSurface, 30),
        text: theme.custom?.textFields?.text || onSurface,
        indicator: theme.custom?.textFields?.indicator || primary,
        background: theme.custom?.textFields?.background || background,
        placeholderDivider:
          theme.custom?.textFields?.placeholderDivider ||
          convertHexToRGBA(onSurface, 30),
      };
    },
    timePickers: () => {
      const { primary, secondary, onSurface } = theme.colors;
      return {
        container: theme.custom?.timePickers?.container || primary,
        text: theme.custom?.timePickers?.text || onSurface,
        overlay: theme.custom?.timePickers?.overlay || primary,
        shape: theme.custom?.timePickers?.shape || secondary,
      };
    },
    badge: () => {
      const { secondary, onSecondary } = theme.colors;
      return {
        container: theme.custom?.badge?.container || secondary,
        text: theme.custom?.badge?.text || onSecondary,
      };
    },
  };
};
