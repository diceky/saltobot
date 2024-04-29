# SALTOBOT Frontend
A simple frontend template for an AI chatbot built with React.


### How It Works
Provides the entire conversation in the following format to an API endpoint
```
{
"messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Who won the world series in 2020?"
      },
    ]
}
```

and receives the response in the following format
```
{
        "role": "assistant",
        "content": "The Los Angeles Dodgers won the World Series in 2020."
}
```