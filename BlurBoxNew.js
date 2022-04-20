import * as React from 'react';
import { View } from 'react-native';

function getBackgroundColor(intensity, tint) {
  const opacity = intensity / 100;
  switch (tint) {
    case 'dark':
      // From apple.com
      return `rgba(28,28,28,${opacity * 0.65})`;
    case 'light':
      // From https://www.apple.com/newsroom
      return `rgba(255,255,255,${opacity * 0.7})`;
    case 'default':
      // From xcode composition
      return `rgba(255,255,255,${opacity * 0.3})`;
  }
  throw new Error(`Unsupported tint provided: ${tint}`);
}

export default class BlurView extends React.Component {
  static defaultProps = {
    tint: 'default',
    intensity: 50,
  };

  render() {
    const { tint, intensity, style = {}, ...props } = this.props;

    const blurStyle = getBlurStyle({ tint, intensity });

    return <View {...props} style={[style, blurStyle]} />;
  }
}

function isBlurSupported() {
  // https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports
  // https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility
  return (
    typeof global.CSS !== 'undefined' &&
    (global.CSS.supports('-webkit-backdrop-filter', 'blur(1px)') ||
      global.CSS.supports('backdrop-filter', 'blur(1px)'))
  );
}

function getBlurStyle({ intensity, tint }) {
  const style = {
    backgroundColor: getBackgroundColor(intensity, tint),
  };

  if (isBlurSupported()) {
    style.backdropFilter = `saturate(180%) blur(${intensity * 0.2}px)`;
  }

  return style;
}
