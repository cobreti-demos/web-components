using System.IO.Abstractions;
using System.Reflection;
using WebComponentServer.AutoMapping;
using WebComponentServer.Configuration;
using WebComponentServer.Services;
using WebComponentServer.Services.ReverseProxy;
using Yarp.ReverseProxy.Configuration;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddTransient<IFileSystem, FileSystem>();
builder.Services.AddAutoMapper(Assembly.GetAssembly(typeof(RouteConfigProfile)));
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(RouteConfigProfile).Assembly));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services
    .AddSingleton<ICustomMemoryConfigFactory, CustomMemoryConfigFactory>()
    .AddSingleton<IComponentProviderFactory, ComponentProviderFactory>()
    .AddSingleton<IComponentsMappingService, ComponentsMappingService>()
    .AddSingleton<IReverseProxyChangesMonitor, ReverseProxyChangesMonitor>()
    .AddSingleton<IRoutesConfigProvider, RoutesConfigProvider>()
    .AddSingleton<IClustersConfigProvider, ClustersConfigProvider>()
    .AddSingleton<IProxyConfigProvider, CustomProxyConfigProvider>()
    .AddReverseProxy();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("*");
    });
});

builder.Services.AddOptions<WebComponentsServerOptions>()
    .Bind(builder.Configuration.GetSection("WebComponentsServer"));

builder.Logging.AddConsole();

var app = builder.Build();

app.MapReverseProxy();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors();

app.MapControllers();


//
// Update providers mapping
//
var componentsMappingService = app.Services.GetService<IComponentsMappingService>();
componentsMappingService?.UpdateMapping();


app.Run();

