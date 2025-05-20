const FilterSidebar = ({ priceRanges, sizes }) => {
    return (
      <div>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">PREÇO</h6>
            <i className="bi bi-chevron-down"></i>
          </div>
          <div>
            {priceRanges.map((range, index) => (
              <div className="form-check mb-2" key={index}>
                <input className="form-check-input" type="checkbox" id={`price-${index}`} />
                <label className="form-check-label" htmlFor={`price-${index}`}>
                  {range}
                </label>
              </div>
            ))}
          </div>
        </div>
  
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">TAMANHO</h6>
            <i className="bi bi-chevron-down"></i>
          </div>
          <div className="d-flex flex-wrap gap-1">
            {sizes.map((size) => (
              <div className="size-box" key={size}>
                {size}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  export default FilterSidebar