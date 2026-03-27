import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  // Preserved stable vars from previous version to maintain upgrade compatibility
  stable let accessControlState : AccessControl.AccessControlState = AccessControl.initState();

  public type UserProfile = {
    name : Text;
  };

  stable let userProfiles = Map.empty<Principal, UserProfile>();

  type PhotoData = {
    blob : Storage.ExternalBlob;
    name : Text;
  };

  let photos = Map.empty<Text, PhotoData>();

  public shared func addPhoto(id : Text, blob : Storage.ExternalBlob, name : Text) : async Bool {
    let photo : PhotoData = { blob; name };
    photos.add(id, photo);
    true;
  };

  public shared func removePhoto(id : Text) : async Bool {
    let contains = photos.containsKey(id);
    photos.remove(id);
    contains;
  };

  public query func getPhotos() : async [(Text, PhotoData)] {
    photos.toArray();
  };

  public shared func clearPhotos() : async () {
    photos.clear();
  };
};
