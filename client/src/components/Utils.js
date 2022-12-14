// Fonction qui permet de traiter les dates des profils
export const dateParser = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    let timestamp = Date.parse(num);
  
    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
  
    return date.toString();
  };
  
  // Date des post
  export const timestampParser = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    let date = new Date(num).toLocaleDateString("fr-FR", options);
    // En string pour etre sure que ça transit bien
    return date.toString();
  }
  
  // Fonction qui retourne true ou false a notre question
  export const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };
  