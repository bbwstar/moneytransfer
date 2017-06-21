import React from 'react';

export default () =>
  (<section>
    <div className="hero is-primary">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-2">
            What do we do?
          </h1>
          <h2 className="subtitle is-4">
            How can we help solve your problems?
          </h2>
        </div>
      </div>
    </div>
    <div className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <article className="tile is-child">
                <p>
                  Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque
                  interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet
                  erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida
                  diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.
                </p>
              </article>
            </div>
          </div>
          <h2 className="title is-primary is-3">Heading</h2>
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile is-child mb20">
                <p>
                  Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque
                  interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet
                  erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida
                  diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.
                </p>
                <p>&nbsp;</p>
              </div>
              <div className="tile is-child">
                <img src="images/02.jpg" alt="" className="image-shadow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>);
