export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <h1 className="hero__heading">
            Everything students
            <br />
            need.{' '}
            <span className="hero__heading-accent">
              All in one place.
              <img
                src="/underline.svg"
                alt=""
                className="hero__heading-underline"
              />
            </span>
          </h1>

          <div className="hero__subheading">
            <img src="/star-icon.svg" alt="" className="hero__subheading-icon" />
            List anything for just €1.
          </div>

          <p className="hero__description">
            Join thousands of students across Europe and the UK<span className="hero__description-break"><br /></span> using 1 Euro Pass to find, connect and save every day.
          </p>

          <div className="hero__ctas">
            <button className="hero__btn-primary" type="button">
              <img src="/browse-icon.png" alt="" className="hero__btn-icon" />
              Browse Listings
            </button>
            <button className="hero__btn-secondary" type="button">
              <img src="/send-icon.png" alt="" className="hero__btn-icon" />
              Post a Listing for €1
            </button>
          </div>

          <div className="hero__trust">
            <div className="hero__trust-item">
              <img src="/icon-secure.png" alt="" className="hero__trust-icon" />
              <span className="hero__trust-text">
                Trusted Community<br />
                <span className="hero__trust-sub">Verified users &amp; safe platform</span>
              </span>
            </div>
            <div className="hero__trust-item">
              <img src="/icon-tag.png" alt="" className="hero__trust-icon" />
              <span className="hero__trust-text">
                Only €1 to List<br />
                <span className="hero__trust-sub">Simple, transparent pricing</span>
              </span>
            </div>
            <div className="hero__trust-item">
              <img src="/icon-heart.png" alt="" className="hero__trust-icon" />
              <span className="hero__trust-text">
                For Students, By Students<br />
                <span className="hero__trust-sub">Built for student life</span>
              </span>
            </div>
          </div>
        </div>

        <div className="hero__video-wrap">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero__video"
            disablePictureInPicture
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
