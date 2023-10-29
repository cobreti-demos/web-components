namespace WebServer.ReverseProxy.Config.Route;

public class MutableRouteTransforms
{
    private List<Dictionary<string, string>> _transforms = new List<Dictionary<string, string>>();

    public void AddPathRemovePrefix(string path)
    {
        _transforms.Add(
            new Dictionary<string, string>(){ {"PathRemovePrefix", path} }
        );
    }

    public IReadOnlyList<IReadOnlyDictionary<string, string>>? ToRouteTransforms()
    {
        if (!_transforms.Any())
        {
            return null;
        }

        return _transforms;
    }
}
