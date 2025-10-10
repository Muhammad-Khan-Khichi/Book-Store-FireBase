import React, { useEffect, useState } from "react";

function Github() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);

        // Fetch user profile
        const userResponse = await fetch(
          "https://api.github.com/users/Muhammad-Khan-Khichi"
        );
        if (!userResponse.ok) throw new Error("Failed to fetch user profile");
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(userData.repos_url);
        if (!reposResponse.ok) throw new Error("Failed to fetch repositories");
        const reposData = await reposResponse.json();

        setUser(userData);
        setRepos(reposData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Loader
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );

  // Error message
  if (error)
    return (
      <p className="text-center text-red-600 font-semibold mt-20">{error}</p>
    );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Profile Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12 border border-gray-100">
        <img
          src={user.avatar_url || "https://via.placeholder.com/150"}
          alt={user.name}
          className="w-36 h-36 rounded-full border-4 border-indigo-500 shadow-md"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-1">
            {user.name || "No Name"}
          </h1>
          <p className="text-gray-500 mb-3">@{user.login}</p>
          <p className="text-gray-700 mb-4 max-w-lg">
            {user.bio || "This user has no bio."}
          </p>
          <div className="flex justify-center sm:justify-start gap-6 text-gray-600 mb-4">
            <p>
              👥 <strong className="text-indigo-700">{user.followers}</strong>{" "}
              Followers
            </p>
            <p>
              🧑‍🤝‍🧑{" "}
              <strong className="text-indigo-700">{user.following}</strong>{" "}
              Following
            </p>
            <p>
              📚 <strong className="text-indigo-700">{user.public_repos}</strong>{" "}
              Repos
            </p>
          </div>
          {user.html_url && (
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 transition duration-300"
            >
              View GitHub Profile
            </a>
          )}
        </div>
      </div>

      {/* Repositories Section */}
      <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700">
        Public Repositories
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 border border-gray-100"
          >
            <div>
              <h3 className="text-lg font-semibold text-indigo-700 mb-1 truncate">
                {repo.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {repo.description || "No description available."}
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                <span>{repo.language || "N/A"}</span>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-medium"
              >
                View Repository
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Github;
