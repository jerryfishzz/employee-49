import { LayoutAnimation, LayoutAnimationConfig } from 'react-native';

export type LayoutAnimParams =
  | boolean // Toggle anim
  | {
      config: LayoutAnimationConfig;
      onAnimationDidEnd?: () => void;
      onAnimationDidFail?: () => void;
    };

interface SetupNextLayoutAnimParams {
  config?: LayoutAnimationConfig;
  layoutAnimParams?: Exclude<LayoutAnimParams, boolean>;
}

export const defaultLayoutAnimConfig: LayoutAnimationConfig = {
  duration: 200,
  create: { type: 'linear', property: 'opacity' },
  update: { type: 'linear' }, // This update is for the whole layout to adapt the new view, not only the animated component
  delete: { type: 'linear', property: 'opacity' },
};

function setupNextLayoutAnim({
  config,
  layoutAnimParams,
}: SetupNextLayoutAnimParams) {
  // Note, config and layoutAnimParams should not exist at the same time

  if (config) {
    LayoutAnimation.configureNext(config);
    return;
  }

  if (layoutAnimParams) {
    const { config, onAnimationDidEnd, onAnimationDidFail } = layoutAnimParams;
    LayoutAnimation.configureNext(
      config,
      onAnimationDidEnd,
      onAnimationDidFail,
    );
  }
}

export function runLayoutAnim(layoutAnimParams?: LayoutAnimParams) {
  console.log('runLayoutAnim');
  // No custom anim, run default
  if (layoutAnimParams === undefined) {
    console.log('undefined');
    setupNextLayoutAnim({ config: defaultLayoutAnimConfig });
    return;
  }

  // Manually setting 'true' to run anim but not give specific config, run default.
  // If setting to 'false', turn off run anim.
  if (typeof layoutAnimParams === 'boolean') {
    layoutAnimParams &&
      setupNextLayoutAnim({ config: defaultLayoutAnimConfig });
    return;
  }

  // Use custom anim config
  setupNextLayoutAnim({ layoutAnimParams });
}
