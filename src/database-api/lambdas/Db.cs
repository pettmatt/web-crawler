namespace DatabaseApi.DB;

public record Site {
    public int id { get; set; }
    public string? name { get; set; }
}

public class IndexDB {
    private static List<Site> _index = new List<Site>() 
    {
        new Site{ id=1, name="Testing 1" },
        new Site{ id=2, name="Testing 2" },
    };

    public static List<Site> GetRecords() {
        return _index;
    }

    public static Site? GetRecord(int id) {
        return _index.SingleOrDefault(site => site.id == id);
    }

    public static Site CreateRecord(Site site) {
        _index.Add(site);
        return site;
    }

    public static Site UpdateRecord(Site update) {
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