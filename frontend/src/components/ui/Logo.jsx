import logoLumiere from "../../assets/logo-lumiere.svg";

export const Logo = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <img 
      src={logoLumiere} 
      alt="Lumière Skin" 
      className={`${sizes[size]} ${className}`}
    />
  );
};

export default Logo;