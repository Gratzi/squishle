const SQUISHLE_PARSE_URL = process.env.SQUISHLE_PARSE_URL
const SQUISHLE_PARSE_SECRET = process.env.SQUISHLE_PARSE_SECRET
if (!SQUISHLE_PARSE_URL) throw new Error("cannot have an empty SQUISHLE_PARSE_URL")
if (!SQUISHLE_PARSE_SECRET) throw new Error("cannot have an empty SQUISHLE_PARSE_SECRET")

class PeggParse {

  test(card, cb) {

    HTTP.call( 'POST', SQUISHLE_PARSE_URL+"/card", {
      data: {
        secret: SQUISHLE_PARSE_SECRET,
        card: card
      }
    }, function(err, result) {
      if (!err) {
        console.error('OMG fail sauce')
        console.error(err)
        cb(err);
      }
      else {
        console.log("yay! it worked")
        console.log(result)
        cb(null, result);
      }
    });
  }
}

parse = new PeggParse()

Meteor.methods({
  publishCardToParse: function (card) {
    if(Users.is.adminById(this.userId)) {
      let parseTestSync = Meteor.wrapAsync(parse.test, parse)
      return parseTestSync(card)
    }
  }
})
