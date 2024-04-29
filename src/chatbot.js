const Chatbot = async (prompt, conversation) => {

    const url = 'http://127.0.0.1:5000/sendMessage';

    let response = '';
    //let response = [];

    try {
        //fetch chatbot response from server
        await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: prompt })
            //body: JSON.stringify({messages: conversation});
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                response = data;
                // response = [
                //     ...conversation,
                //     data
                // ];
            });
    } catch (error) {
        console.error(error);
        response = error;
    }

    return response;
}

export default Chatbot;