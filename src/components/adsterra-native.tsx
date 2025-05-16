import { useEffect } from "react";

const AdsterraNative = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "//comelysouthbuilds.com/aebe990fb5438a745c69d6f8f1cb32a9/invoke.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="container-aebe990fb5438a745c69d6f8f1cb32a9" />;
};

export default AdsterraNative;
