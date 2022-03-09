class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword
            ? { name: { $regex: this.queryStr.keyword, $options: 'i' } }
            : {}

        this.query.find(keyword)

        return this
    }

    filter() {
        const queryStryCopy = { ...this.queryStr }
        const removeFileds = ['keyword', 'page', 'limit']

        removeFileds.forEach((key) => delete queryStryCopy[key])

        let queryStr = JSON.stringify(queryStryCopy)

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

        this.query = this.query.find(JSON.parse(queryStr))

        return this
    }

    pagination(resulstPerPage) {
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resulstPerPage * (currentPage - 1)
        this.query = this.query.find().skip(skip).limit(resulstPerPage)

        return this
    }
}

module.exports = ApiFeatures
