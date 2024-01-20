const apiUrl = "https://api.adviceslip.com/advice";

const getAdvice = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

getAdvice().then((data) => console.log(data.slip.advice));
