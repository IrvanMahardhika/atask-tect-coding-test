import React from 'react';
import cx from 'classnames';

import styles from './Text.module.scss';

type Props = {
  block?: boolean;
  centered?: boolean;
  children?: React.ReactNode;
  className?: string;
  ellipsize?: boolean;
  paragraph?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  strong?: boolean;
  type?: 'white';
  uppercase?: boolean;
};

const Text = (props: Props) => {
  const {
    block,
    centered,
    children,
    className,
    ellipsize,
    paragraph,
    size,
    strong,
    type,
    uppercase
  } = props;

  const cn = cx(
    styles.text,
    {
      [styles.centered]: centered,
      [styles.strong]: strong,
      [styles.ellipsize]: ellipsize,
      [styles.uppercase]: uppercase,
      [styles.xs]: size === 'xs',
      [styles.sm]: size === 'sm',
      [styles.md]: size === 'md',
      [styles.lg]: size === 'lg',
      [styles.xl]: size === 'xl',
      [styles.white]: type === 'white'
    },
    className
  );

  if (paragraph) return <p className={cn}>{children}</p>;
  if (block) return <div className={cn}>{children}</div>;
  return <span className={cn}>{children}</span>;
};

export default Text;
