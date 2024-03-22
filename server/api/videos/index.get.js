export default defineEventHandler( async (event) => {
    try {
        return await VideoSchema.find({})
    }
    catch (error) {
        return error
    }
})