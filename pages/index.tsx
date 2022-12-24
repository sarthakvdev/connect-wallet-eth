import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { client, exploreProfiles } from "../api";
import Link from "next/link";

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
      <main>
        <p className="text-4xl font-bold">Hello lens 🌿</p>
        {profiles.map((profile: any) => (
          <div key={profile.id}>
            <img className="w-48" src={profile.avatarUrl || "https://picsum.photos/200"} />
            <p className="">{profile.name}</p>
            <p className="">{profile.bio}</p>
            <Link href={`/profile/${profile.handle}`}>
              <p className="">${profile.handle}</p>
            </Link>
            <p className="">{profile.stats.totalFollowers} followers</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
