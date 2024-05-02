const Chatbot = async (prompt, conversation) => {

    const url = process.env['REACT_APP_SALTOBOT_ENDOINT'];

    let response = [];

    try {
        //fetch chatbot response from server
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: conversation })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                response = [
                    ...conversation,
                    data["body-json"].body
                ];
            });
    } catch (error) {
        console.error(error);
    }

    return response;
}

export default Chatbot;