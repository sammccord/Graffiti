var Graffiti = function(api) {
    //Host URL for JSON rest API
    this.api = api;
}

InfoWar.prototype.Domain = function() {
    var self = this;
    return {
        GET: function(args, callback) {
            console.log(self);
            //args.domain
            var domain = args.domain;
            var path = args.path;
            // //Convert to a param safe format to talk to api
            var domain_param = domain.replace(/\./g, '+');
            var path = path.replace(/\//g, '+');
            console.log(domain_param);
            $.ajax({
                url: self.api + '/api/domains/'+domain_param,
                dataType: 'json',
                success: function(data) {
                    console.log('success');
                    callback(null, data)
                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                    callback(err.toString())
                }
            });

        },
        POST: function POST() {

        },
        UPDATE: function UPDATE() {

        },
        DELETE: function DELETE() {

        }
    }
}

InfoWar.prototype.User = function() {
		var self = this;
    return {
        GET: function GET() {

        },
        POST: function POST() {

        },
        UPDATE: function UPDATE() {

        },
        DELETE: function DELETE() {

        }
    }
}
