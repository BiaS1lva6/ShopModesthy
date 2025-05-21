import Banner1 from "../img/1.png";
import Banner2 from "../img/2.png";
import Banner3 from "../img/3.png";
const Carousel = () => {
  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      <div className="carousel-inner">
  <div className="carousel-item active">
    <img src={Banner1} className="d-block w-100 img-fluid" alt="Banner 1" />
  </div>
  <div className="carousel-item">
    <img src={Banner2} className="d-block w-100 img-fluid" alt="Banner 2" />
  </div>
  <div className="carousel-item">
    <img src={Banner3} className="d-block w-100 img-fluid" alt="Banner 3" />
  </div>
</div>

      <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Próximo</span>
      </button>
    </div>
  )
}

export default Carousel
