import * as React from "react";

interface IProps {
  Icon: React.ElementType | string;
  profile: string;
  profileUrl: string;
  className: string;
}

export const SocialWrapper: React.FC<IProps> = ({
  Icon,
  profile,
  profileUrl,
  children,
  className,
}) => {
  return (
    <div className="Social-wrapper">
      <div className="Social-icon">
        <Icon />
      </div>
      <a href={profileUrl} className="underline Social-profile">
        {profile}
      </a>
      <div className={"Social-content " + className}>{children}</div>
    </div>
  );
};
