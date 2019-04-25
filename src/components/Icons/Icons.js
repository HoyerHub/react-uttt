import React, {Component} from 'react';
import './Icons.css';

class IconReset extends Component {
    render() {
        return (
            <span className="icon-reset" onClick={this.props.onClick}>
                <svg x="0px" y="0px" viewBox="0 0 438.542 438.542">
                    <path d="M427.408,19.697c-7.803-3.23-14.463-1.902-19.986,3.999l-37.116,36.834C349.94,41.305,326.672,26.412,300.5,15.848   C274.328,5.285,247.251,0.003,219.271,0.003c-29.692,0-58.052,5.808-85.08,17.417c-27.03,11.61-50.347,27.215-69.951,46.82   c-19.605,19.607-35.214,42.921-46.824,69.949C5.807,161.219,0,189.575,0,219.271c0,29.687,5.807,58.05,17.417,85.079   c11.613,27.031,27.218,50.347,46.824,69.952c19.604,19.599,42.921,35.207,69.951,46.818c27.028,11.611,55.388,17.419,85.08,17.419   c32.736,0,63.865-6.899,93.363-20.7c29.5-13.795,54.625-33.26,75.377-58.386c1.52-1.903,2.234-4.045,2.136-6.424   c-0.089-2.378-0.999-4.329-2.711-5.852l-39.108-39.399c-2.101-1.711-4.473-2.566-7.139-2.566c-3.045,0.38-5.232,1.526-6.566,3.429   c-13.895,18.086-30.93,32.072-51.107,41.977c-20.173,9.894-41.586,14.839-64.237,14.839c-19.792,0-38.684-3.854-56.671-11.564   c-17.989-7.706-33.551-18.127-46.682-31.261c-13.13-13.135-23.551-28.691-31.261-46.682c-7.708-17.987-11.563-36.874-11.563-56.671   c0-19.795,3.858-38.691,11.563-56.674c7.707-17.985,18.127-33.547,31.261-46.678c13.135-13.134,28.693-23.555,46.682-31.265   c17.983-7.707,36.879-11.563,56.671-11.563c38.259,0,71.475,13.039,99.646,39.116l-39.409,39.394   c-5.903,5.711-7.231,12.279-4.001,19.701c3.241,7.614,8.856,11.42,16.854,11.42h127.906c4.949,0,9.23-1.807,12.848-5.424   c3.613-3.616,5.42-7.898,5.42-12.847V36.55C438.542,28.558,434.84,22.943,427.408,19.697z"/>
                </svg>
            </span>
        );
    }
}

class IconUserSilhouette extends Component {
    render() {
        return (
            <span className="icon-user" onClick={this.props.onClick}>
                <svg x="0px" y="0px" viewBox="0 0 258.75 258.75">
                    <circle cx="129.375" cy="60" r="60"/>
                    <path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z"/>
                </svg>
            </span>
        );
    }
}

class IconComputer extends Component {
    render() {
        return (
            <span className="icon-computer" onClick={this.props.onClick}>
                <svg x="0px" y="0px" viewBox="0 0 612 612">
                    <path d="M578.766,51.487v-0.895h-2.996H35.93h-2.996v0.895C15.272,52.701,2.095,66.753,0,83.808v3.002v355.724   c0,6.898,1.795,12.712,4.791,17.949c6.893,12.137,17.068,18.269,31.14,18.269h197.012v49.695h-37.425   c-9.281,0-16.467,7.218-16.467,16.48c0,9.262,7.186,16.479,16.467,16.479h220.666c9.281,0,16.768-7.218,16.768-16.479   c0-9.263-7.486-16.48-16.768-16.48h-37.425v-49.695H575.77c14.078,0,24.343-6.132,31.14-18.269   c3.085-5.493,5.091-11.37,5.091-17.949V86.811v-3.002C609.905,66.753,595.833,52.701,578.766,51.487z M578.766,86.811v355.724   c0,2.108-0.895,3.002-2.996,3.002H35.93c-2.095,0-2.996-0.894-2.996-3.002V86.811v-3.002h545.831V86.811z"/>
                </svg>
            </span>
        );
    }
}

class IconSpinner extends Component{
    render() {
        return (
            <span className="icon-spinner" onClick={this.props.onClick}>
                <svg className="lds-spinner" viewBox="0 0 100 100"
                     preserveAspectRatio="xMidYMid" style={{background: "none"}}>
                    <g transform="rotate(0 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#969696">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s"
             repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(30 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#969696">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s"
             repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(60 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#969696">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(90 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#969696">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s"
             repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(120 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#969696">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s"
             repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(150 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#969696">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(180 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#969696">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s"
             repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(210 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#969696">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s"
             repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(240 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#969696">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(270 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#969696">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s"
             repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(300 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#969696">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s"
             repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(330 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#969696">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
  </rect>
</g></svg>
            </span>
        )
    }
}

export {IconReset, IconSpinner, IconUserSilhouette, IconComputer};