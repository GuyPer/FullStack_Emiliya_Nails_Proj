import { TbCircleLetterEFilled } from "react-icons/tb";
import "./CompanyLogo.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface ICompanyLogoProps {
  onClick?: () => void;
}

export default function CompanyLogo(props: ICompanyLogoProps) {
  useEffect(() => {
    const svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="pink" stroke="currentColor" strokeWidth="2"/>
            <text x="8" y="17" fontSize="12" fill="currentColor" textAnchor="middle" alignmentBaseline="middle">E</text>
        </svg>
    `;

    const svgDataUri = `data:image/svg+xml,${encodeURIComponent(svgIcon)}`;
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = svgDataUri;
    document.head.appendChild(link);
  }, []);

  return (
    <div onClick={props.onClick} className="CompanyLogo">
      <Link to={"/home"}>
        <TbCircleLetterEFilled className="EmiliyaBusinessLogo" size={20} />
      </Link>
    </div>
  );
}
