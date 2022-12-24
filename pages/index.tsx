import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { client, exploreProfiles } from "../api";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  const [profiles, setProfiles] = useState<any>([]);

  const fetchProfiles = async () => {
    try {
      const response = await client.query({ query: exploreProfiles });
      const profileData = await Promise.all(
        response.data.exploreProfiles.items.map(async (profileInfo: any) => {
          let profile = { ...profileInfo };
          let picture = profile.picture;
          if (picture && picture.original && picture.original.url) {
            if (picture.original.url.startsWith("ipfs://")) {
              let result = picture.original.url.substring(
                7,
                picture.original.url.length
              );
              profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`;
            } else {
              profile.avatarUrl = picture.original.url;
            }
          }
          return profile;
        })
      );

      setProfiles(profileData);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    console.log("profiles", profiles);
  }, [profiles]);

  return (
    <div className="py-6 justify-center text-center">
      <p className="text-4xl font-bold">Hello lens 🌿</p>
      {profiles.length !== 0 ? (
        <div className="flex flex-col w-fit items-start gap-y-6 mx-auto mt-10">
          {profiles.map((profile: any) => (
            <div
              key={profile.id}
              className="flex flex-row border p-4 rounded-xl min-w-full w-fit hover:shadow-sm"
            >
              <div className="w-1/3">
                <img
                  className="w-48 rounded-xl"
                  alt="profile"
                  src={profile.avatarUrl || "https://picsum.photos/200"}
                />
              </div>
              <div className="flex flex-col w-2/3 max-w-md text-left">
                <p className="font-semibold text-lg">{profile.name}</p>
                <Link href={`/profile/${profile.handle}`}>
                  <p className="text-blue-500 font-medium hover:underline">
                    @{profile.handle}
                  </p>
                </Link>
                <p className="mt-3">{profile.bio}</p>
                <div className="inline-flex gap-x-4 mt-3">
                  <p>
                    <span className="font-semibold">
                      {profile.stats.totalFollowing}
                    </span>{" "}
                    following
                  </p>
                  <p>
                    <span className="font-semibold">
                      {profile.stats.totalFollowers}
                    </span>{" "}
                    followers
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="page-center gap-y-4">
          <span className="text-5xl animate-bounce">🌿</span>
          <span>loading profiles...</span>
        </div>
      )}
    </div>
  );
};

export default Home;
