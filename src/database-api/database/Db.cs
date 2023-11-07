namespace DatabaseApi.DB;

public record ScrapedSite {
    public int id { get; set; }
    public string? name { get; set; }
}

public class IndexDB {
    private static List<ScrapedSite> _index = new List<ScrapedSite>() {
        new ScrapedSite{ id=1, name="Testing 1" },
        new ScrapedSite{ id=2, name="Testing 2" },
    };

    public static List<ScrapedSite> GetRecords() {
        return _index;
    }

    public static ScrapedSite? GetRecord(int id) {
        return _index.SingleOrDefault(site => site.id == id);
    }

    public static ScrapedSite CreateRecord(ScrapedSite site) {
        _index.Add(site);
        return site;
    }

    public static ScrapedSite UpdateRecord(ScrapedSite update) {
        _index = _index.Select(site => {
            if (site.id == update.id) {
                site.name = update.name;
            }

            return site;
        }).ToList();

        return update;
    }

    public static void RemoveRecord(int id) {
        _index = _index.FindAll(site => site.id != id).ToList();
    }
}