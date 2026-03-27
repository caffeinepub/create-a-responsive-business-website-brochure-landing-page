import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  stable let accessControlState : AccessControl.AccessControlState = AccessControl.initState();

  public type UserProfile = {
    name : Text;
  };

  stable var userProfiles : Map.Map<Principal, UserProfile> = Map.empty();

  public type PhotoData = {
    blob : Storage.ExternalBlob;
    name : Text;
  };

  // Stable storage - photos survive canister upgrades
  stable var photos : Map.Map<Text, PhotoData> = Map.empty();

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

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };
};
