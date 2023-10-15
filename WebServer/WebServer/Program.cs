using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("*");
    });
});

var app = builder.Build();

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


app.UseFileServer(new FileServerOptions
{
    FileProvider =
        new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(),
                "../../Components/Vanilla/Web-Components/dist")),
    RequestPath = "/vanilla",
});

app.UseFileServer(new FileServerOptions
{
    FileProvider =
        new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(),
            "../../Components/React/Web-Components/dist")),
    RequestPath = "/react"
});

app.UseFileServer(new FileServerOptions
{
    FileProvider =
        new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(),
                "../../Components/Angular/Web-Component/dist/web-component")),
    RequestPath = "/angular"
});

app.UseFileServer(new FileServerOptions
{
    FileProvider =
        new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(),
                "../../Apps/appdemo1/dist")),
    RequestPath = "/appdemo1"
});


app.Run();