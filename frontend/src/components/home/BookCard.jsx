import SingleBookCard from "./SingleBookCard"

const BookCard = ({books}) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {books.map((book) => {
        return(
          <SingleBookCard key={book._id} book={book}/>
        )
      })}
    </div>
  )
}

export default BookCard