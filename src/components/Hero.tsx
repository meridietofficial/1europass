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
            Join thousands of students across Europe and the UK using 1 Euro Pass to find, connect and save every day.
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
              <div>
                <div className="hero__trust-label">Trusted Community</div>
                <div className="hero__trust-desc">
                  Verified users &amp;
                  <br />
                  safe platform
                </div>
              </div>
            </div>
            <div className="hero__trust-item">
              <img src="/icon-tag.png" alt="" className="hero__trust-icon" />
              <div>
                <div className="hero__trust-label">Only €1 to List</div>
                <div className="hero__trust-desc">
                  Simple, transparent
                  <br />
                  pricing
                </div>
              </div>
            </div>
            <div className="hero__trust-item">
              <img src="/icon-heart.png" alt="" className="hero__trust-icon" />
              <div>
                <div className="hero__trust-label">
                  For Students,
                  <br />
                  By Students
                </div>
                <div className="hero__trust-desc">Built for student life</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__video-wrap">
          <video
            src="/hero-animation.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="hero__video"
            disablePictureInPicture
          />
        </div>
      </div>
    </section>
  )
}
