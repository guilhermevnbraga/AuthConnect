import { getServerSession } from "next-auth";
import Banner from "../ui/profile/banner";
import Header from "../ui/home/header";
import Option from "../ui/profile/options";

export default async function Page({ params }: { params: { name: string } }) {
    let user = null;
    const session = await getServerSession();

    const { name } = params;

    const fetchUser = await fetch("https://italk-server.vercel.app/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });

    const userData = await fetchUser.json();
    if (fetchUser.status === 400) {
        console.log(userData);
    } else {
        user = userData.user;
    }

    const hasFriend = await fetch("https://italk-server.vercel.app/hasFriend", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userEmail: session?.user?.email,
            friendEmail: user.email,
        }),
    });

    let acessUsername = "";
    const fetchAcessUsername = await fetch("https://italk-server.vercel.app/username", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email }),
    });

    const acessUsernameData = await fetchAcessUsername.json();
    if (fetchAcessUsername.status === 400) {
        console.log(acessUsernameData);
    } else {
        acessUsername = acessUsernameData.username;
    }

    const friendData = await hasFriend.json();
    if (hasFriend.status === 400) {
        console.log(friendData);
    } else {
        user.hasFriend = friendData.hasFriend;
    }

    return (
        <main className="flex items-center flex-col min-h-screen">
            <Header
                name={session?.user?.name || ""}
                username={user.username}
                email={session?.user?.email || ""}
            ></Header>
            <div className="flex flex-col w-4/6 grow shadow-[0_0_9px_0_rgba(0,0,0,0.15)]">
                <Banner
                    user={user}
                    acessUsername={acessUsername}
                    acessUserEmail={session?.user?.email || ""}
                ></Banner>
                <Option user={user} acessUser={acessUsername}></Option>
            </div>
        </main>
    );
}
