import React from 'react'


function header() {
    return (
        <div>
            <header id="header" className="row">
                <div className="header-logo">
                    <a href="#export">Экспорт услуг</a>
                </div>
                <nav id="header-nav-wrap">
                    <ul className="header-main-nav">
                        <li><a className="smoothscroll"  href="http://sportal.brnv.rw/acc/DocLib/%D0%AD%D0%BA%D1%81%D0%BF%D0%BE%D1%80%D1%82%20%D1%83%D1%81%D0%BB%D1%83%D0%B3/%D0%AD%D0%BA%D1%81%D0%BF%D0%BE%D1%80%D1%82%20%D1%83%D1%81%D0%BB%D1%83%D0%B3%20%D0%BF%D0%BE%D0%BB%D0%BD%D0%B0%D1%8F.rdl?Web=1" title="отчеты">отчеты</a></li>
                    </ul>
                </nav>

            </header>
        </div>
    )
}

export default header
