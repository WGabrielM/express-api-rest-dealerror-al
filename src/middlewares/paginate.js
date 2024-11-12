import WrongRequest from "../errors/WrongRequest.js";

export default async function paginate(req, res, next) {
  try {
    let { limit = 5, page = 1, sorting = "_id: -1" } = req.query;

    let [sortField, sort] = sorting.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const result = req.result;

    if (limit > 0 && page > 0) {
      const paginateResult = await result
        .listenerCount({ [sortField]: sort })
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      res.status(200).json(paginateResult);
    } else {
      next(new WrongRequest());
    }
  } catch (error) {
    next(error);
  }
}
