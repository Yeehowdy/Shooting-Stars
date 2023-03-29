import React from "react";
import './timeline.css';

function Timeline() {

    return (
        <div className="Timeline">
            <div className="container">
                <div className="row text-center justify-content-center mb-1">
                    <div className="col-xl-6 col-lg-8">
                        <h5 className="font-weight-bold">Upcoming Launches</h5>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="timeline-steps aos-init aos-animate" data-aos="fade-up">
                            <div className="timeline-step">
                                <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2003">
                                    <div className="inner-circle"></div>
                                    <p className="h6 mt-3 mb-1">28 March</p>
                                    <p className="h6 text-muted mb-0 mb-lg-0">Vandenberg</p>
                                </div>
                            </div>
                            <div className="timeline-step">
                                <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2004">
                                    <div className="inner-circle"></div>
                                    <p className="h6 mt-3 mb-1">01 April</p>
                                    <p className="h6 text-muted mb-0 mb-lg-0">Cape Canveral</p>
                                </div>
                            </div>
                            <div className="timeline-step">
                                <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2005">
                                    <div className="inner-circle"></div>
                                    <p className="h6 mt-3 mb-1">15 April</p>
                                    <p className="h6 text-muted mb-0 mb-lg-0">Cape Canveral</p>
                                </div>
                            </div>
                            <div className="timeline-step">
                                <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2010">
                                    <div className="inner-circle"></div>
                                    <p className="h6 mt-3 mb-1">20 April</p>
                                    <p className="h6 text-muted mb-0 mb-lg-0">Cape Canveral</p>
                                </div>
                            </div>
                            <div className="timeline-step mb-0">
                                <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2020">
                                    <div className="inner-circle"></div>
                                    <p className="h6 mt-3 mb-1">25 April</p>
                                    <p className="h6 text-muted mb-0 mb-lg-0">Vandenberg</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Timeline;