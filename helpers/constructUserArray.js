import usersServices from "../services/usersServices.js";
import recipesServices from "../services/recipesServices.js";

async function constructUserArray(idArray, settings = {}) {
  const userArray = await usersServices.findUsers({
    filter: { _id: { $in: idArray } },
    fields: "-createdAt -updatedAt -password -token -favorites -following",
    settings,
  });

  const promises = userArray.map(async user => {
    const userRecipes = await recipesServices.getRecipeList({
      filter: { owner: user._id },
      fields: "-createdAt -updatedAt",
    });
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      recipesCount: userRecipes.length,
      followersCount: user.followers.length,
      ownRecipes: userRecipes,
    };
  });

  const resultArray = await Promise.all(promises);
  return resultArray;
}

export default constructUserArray;
