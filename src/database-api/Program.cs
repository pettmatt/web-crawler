using Microsoft.OpenApi.Models;
using DatabaseApi.DB;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1", new OpenApiInfo {
        Title = "Database API",
        Description = "Endpoint of interacting with database entries",
        Version = "v1",
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Database API V1");
});

app.MapGet("/", () => "Hello World!");
app.MapGet("/sites", () => IndexDB.GetRecords());
app.MapGet("/sites/{id}", (int id) => IndexDB.GetRecord(id));
app.MapPost("/sites", (ScrapedSite site) => IndexDB.CreateRecord(site));
app.MapPut("/sites", (ScrapedSite site) => IndexDB.UpdateRecord(site));
app.MapDelete("/sites/{id}", (int id) => IndexDB.RemoveRecord(id));

app.Run();
