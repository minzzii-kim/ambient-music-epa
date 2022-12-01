module.exports = class MusicData {
  constructor(build) {
    if (!build) return;
    this.id = build.id;
    this.artist_name = build.artist_name;
    this.song_name = build.song_name;
    this.playlist_id = build.playlist_id;
    this.playlist_name = build.playlist_name;
    this.playlist_url = build.playlist_url;
  }
  static get Builder() {
    class Builder {
      setId(id) {
        this.id = id;
        return this;
      }
      setArtistName(name) {
        this.artist_name = name;
        return this;
      }
      setSongName(name) {
        this.song_name = name;
        return this;
      }
      setPlaylistId(id) {
        this.playlist_id = id;
        return this;
      }
      setPlaylistName(name) {
        this.playlist_name = name;
        return this;
      }
      setPlaylistUrl(url) {
        this.playlist_url = url;
        return this;
      }
      build(data) {
        this.setId(data.song_id)
          .setArtistName(data.artist_name)
          .setSongName(data.song_name)
          .setPlaylistId(data.playlist_id)
          .setPlaylistUrl(data.playlist_url);
        return this;
      }
      responseMessage() {
        let data = {
          id: this.id,
          artist_name: this.artist_name,
          song_name: this.song_name,
          playlist_id: this.playlist_id,
          playlist_name: this.playlist_name,
          playlist_url: this.playlist_url,
        };
        return data;
      }
    }
    return new Builder();
  }
};
