async function feed(parent, args, context, info) {
  //args have a property called filter, if it exists return the object
  //else return empty object
  const where_clause = args.filter ? {
    //this is an argument you can pass into a prisma object (see below)
    OR: [
      //OR is a list of objects
      { description_contains: args.filter },
      { url_contains: args.filter },
    ],
  } : {}

  //when returning prisma links, one can add in an object that contains helpful properties
  //such as filter properties (a where clause)
  const links = await context.prisma.links({
    where: where_clause,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });

  const count = await context.prisma.linksConnection({
    where: where_clause
  }).aggregate().count();

  return {
    links, 
    count,
  };
}


function info() {
  return "This is a test message for infor resolver";
}
  
  module.exports = {
    feed,
    info
  }