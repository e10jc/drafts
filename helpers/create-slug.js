const slugify = require('slugify')

module.exports = (input, {Model, field}) => {
  return slugify(input, {lower: true})
}