import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";

module {
  type Actor = {
    photos : Map.Map<Text, { blob : Storage.ExternalBlob; name : Text }>;
    userProfiles : Map.Map<Principal, { name : Text }>;
  };

  public func run(_old : {}) : Actor {
    {
      photos = Map.empty<Text, { blob : Storage.ExternalBlob; name : Text }>();
      userProfiles = Map.empty<Principal, { name : Text }>();
    };
  };
};
