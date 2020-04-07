import { Component, OnInit, ViewChild, EventEmitter, Output, Input, OnChanges, SimpleChanges, OnDestroy, Renderer2, ChangeDetectorRef } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('mainMap') map: GoogleMap;
  @Output() places: EventEmitter<any> = new EventEmitter<any>();
  @Output() placesAdress: EventEmitter<any> = new EventEmitter<any>();
  @Input() adressType: string;
  @Input() inputDirections: any;
  @Input() polylines: any;
  @Output() statusDraw: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() dataRoute: EventEmitter<any> = new EventEmitter<any>();
  @Input() statusAddress: boolean;

  public zoom: number = 13;
  public center: google.maps.LatLngLiteral;
  public moveCenter: google.maps.LatLngLiteral;
  public changeCenter: google.maps.LatLngLiteral;
  public options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    fullscreenControl: false,
    streetViewControl: false,
    maxZoom: 15,
    minZoom: 0,
  };
  public markers: any[] = [];
  public polyline: any[] = [];
  public polylinesOptions: any = {
    geodesic: true,
    strokeColor: '#4a6a86',
    strokeWeight: 5,
  };
  private locationData: any;
  public directionsServices: google.maps.DirectionsService = new google.maps.DirectionsService();
  public directionsRendered: google.maps.DirectionsRenderer;
  public mapPolylines: any;

  constructor(private rederer2: Renderer2, public $localStorage: LocalstorageService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.getAddressFromNewCenter(this.center);
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputDirections'] && this.inputDirections != null) {
      this._searchPlaces();
    }
    if (changes['statusAddress']) {
      if (this.statusAddress) {
        this.setNewMap();
        this.statusDraw.emit(true);
      }
    }
  }

  setNewMap() {
    var polyline = this.polylines;
    this.directionsRendered = new google.maps.DirectionsRenderer();
    var center = new google.maps.LatLng(polyline[0].routes.lat, polyline[0].routes.lng);
    var options: google.maps.MapOptions = {
      scrollwheel: false,
      disableDoubleClickZoom: false,
      fullscreenControl: false,
      streetViewControl: false,
      maxZoom: 15,
      minZoom: 0,
      center: center,
    };
    var map = new google.maps.Map(document.getElementById('mapPolylines'), options);
    this.mapPolylines = map;
    this.drawShapesInMap();
  }

  drawShapesInMap() {
    var polyline = this.polylines;
    var origin, destination;
    var wayPointsOptions = []
    var wayPoints = [];
    var adress = []
    for (var i = 0; i < polyline.length; i++) {
      adress.splice(i, 0, polyline[i].id);
      wayPoints.splice(i, 0, polyline[i].routes);
      wayPointsOptions.splice(i, 0, { location: new google.maps.LatLng(polyline[i].routes.lat, polyline[i].routes.lng), stopover: true });
    }
    this.$localStorage.setRoutes(adress);
    origin = new google.maps.LatLng(wayPoints[0].lat, wayPoints[0].lng);
    destination = new google.maps.LatLng(wayPoints[wayPoints.length - 1].lat, wayPoints[wayPoints.length - 1].lng);
    if (polyline.length > 2) {
      wayPointsOptions.splice(wayPointsOptions[0], 1);
      wayPointsOptions.splice(wayPointsOptions.length - 1, 1);
    }
    this.drawPolylines(origin, destination, polyline.length > 2 ? wayPointsOptions : []);
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  public getCenterUbication($event?: any): void {
    this.moveCenter = {
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng(),
    }
    this.getAddressFromNewCenter(this.moveCenter);
  }

  public recalculateUbication() {
    this.map.panTo(this.center);
    this.changeDetectorRef.detectChanges();
    this.getAddressFromNewCenter(this.center);
  }


  public setMarkers(latLng: any, id: number) {
    this.markers.push({
      position: {
        lat: latLng.lat,
        lng: latLng.lng,
      },
      label: {
        color: 'white',
        text: this.returnLabelMark(id),
      },
    });
  }

  private _searchPlaces() {
    const autocomplete = new google.maps.places.Autocomplete(this.inputDirections,
      {
        componentRestrictions: { country: 'CO' },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: any) {
    console.log(place);
    this.changeCenter = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    }
    this.map.panTo(this.changeCenter);
    let latLng = {
      address: place.formatted_address, latLng: this.changeCenter,
    };
    this.locationData = latLng;
    this.places.emit(latLng);
  }

  getAddressFromNewCenter(place: any): void {
    const geocoder = new google.maps.Geocoder;
    geocoder.geocode({ location: place }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          let latLng = {
            address: results[0].formatted_address,
            latLng: {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            },
          };
          this.locationData = latLng;
          this.places.emit(latLng);
        } else {
          console.log('zero results');
        }
      } else {
        console.log('ERROR', status);
      }
    });
  }

  setPolylines(polyline): void {
    this.polyline = polyline;
  }

  returnLabelMark(id: number): string {
    switch (id) {
      case 0: return 'A';
      case 1: return 'B';
      case 2: return 'C';
      case 3: return 'D';
      case 4: return 'E';
      case 5: return 'F';
      case 6: return 'G';
      case 7: return 'H';
      case 8: return 'I';
      case 9: return 'J';
      case 10: return 'K';
      case 11: return 'L';
      case 12: return 'M';
      case 13: return 'N';
      case 14: return 'Ñ';
      case 15: return 'O';
      case 16: return 'P';
      case 17: return 'Q';
      case 18: return 'R';
      case 19: return 'S';
    }
  }

  drawPolylines(origin: any, destine: any, waypoints: any) {
    this.directionsRendered = new google.maps.DirectionsRenderer({ map: this.mapPolylines });
    this.directionsServices.route({
      origin: origin,
      destination: destine,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    }, async (response, status) => {
      if (status === 'OK') {
        console.log(response, 'POLYLINES');
        this.directionsRendered.setDirections(response);
        if (response.routes[0].legs.length > 1) {
          var route = await this.calculateTimeAndKm(response.routes[0].legs);
          this.dataRoute.emit({
            distance: route.distance,
            duration: route.duration,
          });
        } else {
          this.dataRoute.emit({
            distance: response.routes[0].legs[0].distance.text.split(' ')[0],
            duration: response.routes[0].legs[0].duration.text.split(' ')[0],
          });
        }

      } else {
        console.log('ERROR', status);
      }
    });
  }

  calculateTimeAndKm(routes: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      var calc;
      routes.forEach((route) => {
        let distance = parseFloat(route.distance.text.split(' ')[0]);
        let duration = parseFloat(route.duration.text.split(' ')[0]);
        calc = {
          distance: distance++,
          duration: duration++,
        }
      });
      resolve(calc);
    });
  }

  ngOnDestroy(): void {
    this.placesAdress.emit(this.locationData);
  }

}
