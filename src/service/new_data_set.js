const handleClear = () => {
    fetch("http://localhost:8000/data/refresh/", {
        method: "DELETE",
      })
        .then(response => response.json())
        .then(data => console.log(data))  
        .catch(error => console.error("Error:", error)); 
}

const handleGenerate = () => {
    fetch("http://localhost:8000/data/refresh/", {
        method: "POST",
      })
        .then(response => response.json())
        .then(data => console.log(data))  
        .catch(error => console.error("Error:", error));
}

export { handleClear, handleGenerate }