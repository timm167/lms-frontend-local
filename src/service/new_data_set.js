import base_url from './base_url'

const handleClear = () => {
    fetch(`${base_url}data/refresh/`, {
        method: "DELETE",
      })
        .then(response => response.json())
        .then(data => console.log(data))  
        .catch(error => console.error("Error:", error)); 
}

const handleGenerate = () => {
    fetch(`${base_url}data/refresh/`, {
        method: "POST",
      })
        .then(response => response.json())
        .then(data => console.log(data))  
        .catch(error => console.error("Error:", error));
}

export { handleClear, handleGenerate }