namespace WebServer.Commands.Responses;

public class RequestResponse
{
    public string? Error { get; }
    public bool Succeeded { get; }

    public RequestResponse(bool success = false, string error = null)
    {
        Error = error;
        Succeeded = false;
    }
}


public class RequestResponse<TYPE> : RequestResponse
{
    public TYPE Value { get; }

    public RequestResponse(TYPE value)
    {
        Value = value;
    }
}
